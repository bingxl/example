import requests
import threading
from bs4 import BeautifulSoup
from lxml import html
import json
import xml
import sys
import argparse
import os
import time
import tqdm


class T66y():
    '''下载t66y中的图片
    
    Parameters
    ----------
    proxy: str
        代理服务器
    max_thread: int
        最大线程数
    store_path: path
        图片存放路径
    '''
    def __init__(self, proxy='', max_thread=300, store_path='./t66y/'):
        self.proxy = proxy
        self.max_thread = max_thread
        self.class_list1 = ["[亞洲]", "[歐美]", "[動漫]", "[寫真]", "[原创]", "[其它]"]
        self.host = "http://t66y.com/"
        self.url1 = "http://t66y.com/thread0806.php?fid=8&search=&page="
        self.url2 = "http://t66y.com/thread0806.php?fid=16&search=&page="
        self.path = store_path
        self.head = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4107.0 Safari/537.36'
        }

    def request(self, url, stream=False, timeout=(20, 240)):
        """获取网页内容"""
        if self.proxy:
            return requests.get(url, proxies=self.proxy, headers=self.head, stream=stream, timeout=timeout)
        else:
            return requests.get(url, headers=self.head, stream=stream, timeout=timeout)

    def download_pic(self, name, url):
        '''该函数用于下载具体帖子内的图片
        
        Parameters
        ----------

        '''
        count = -1

        # classfily 分类, articname帖子名称
        classfily, articname = name[:4], name[4:]

        savepath = self.path+"/" + classfily + "/" + articname

        if not os.path.exists(f'{self.path}/{classfily}'):
            os.mkdir(self.path+"/" + articname)

        if os.path.exists(savepath):
            print("path['" + savepath + "'] exists")
            return 0
        else:
            os.mkdir(savepath)
        try:
            f = self.request(url, False)
        except Exception as e:
            print("download failed:", e)
            return 0
        soup = BeautifulSoup(f.content, "lxml")
        photo_div = soup.find_all('div', class_="tpc_content do_not_catch")
        try:
            photo_list = photo_div[0].find_all('img')
        except Exception as e:
            print("\nUrl(%s) filed to get photo list cause :" % (url), e)
            return 0

        photo_num = len(photo_list)
        # bar=tqdm.tqdm(photo_list)
        #bar.set_description("post url: %s" % (url))
        index = 0
        for li in photo_list:
            # print(str(li))
            index += 1
            pic_url = str(li).split('"')[-2]
            print("[%d/%d] Download: %s" % (index, photo_num, url))
            try:
                r = self.request(pic_url, stream=True)
            except Exception as e:
                print("connect failed:", e)
                return 0
            if r.status_code == 200:
                count += 1
                try:
                    savefilename = savepath+"/" + \
                        str(count)+"."+pic_url.split(".")[-1]
                except:
                    savefilename = savepath+"/"+str(count)+".jpg"
                open(savefilename, 'wb').write(r.content)
                # print("(%d/%d)"%(count+1,photo_num))
            else:
                print(r.status_code, ":url(%s) request failed!" % (pic_url))
            del r
        print("帖子[%s]下载完成，共下载[%d/%d]幅图片，有[%d]幅下载失败。" %
              (url, count+1, photo_num, photo_num-count-1))

    def pre_exit(self):
        while(1):
            thread_unfinished = threading.active_count() - 1
            if thread_unfinished > 0:
                print("\n***剩余下载线程：[%d]***\n若长时间无响应请手动结束进程..." %
                      (thread_unfinished))
                time.sleep(10)
            else:
                print("下载已完成！")
                sys.exit(0)

    def get_list(self, class_name, url):
        '''获取板块内的帖子列表
        
        Paramteres
        ----------
        class_name: str
            板块名称
        url: URL
            板块地址
        '''
        if not os.path.exists(self.path + class_name):
            os.mkdir("./t66y/"+class_name)

        # 帖子类型
        post_class = ""
        
        try:
            f = self.request(url, False)
        except Exception as e:
            print("Connect failed:", e)
            sys.exit(0)

        soup = BeautifulSoup(f.content, "lxml")
        td = soup.find_all('td', class_="tal")
        post_list = dict()
        for i in td:
            if "↑" in str(i):  # 过滤几个置顶公告帖
                continue
            for item in self.class_list1:
                if item in str(i):
                    post_class = item
                    break
                else:
                    post_class = "[其它]"
            post_title = i.find_all('h3')[0].find_all('a')[0].string
            post_title = post_class+post_title
            post_url = str(i.find_all('h3')[0]).split('"')[1]
            post_url = self.host + post_url
            post_list[post_title] = post_url

        print(post_list)
        bar = tqdm.tqdm(post_list)
        bar.set_description("获取【%s】帖子列表=>" % (class_name))
        for key in bar:
            # download_pic(key,post_list[key],"./t66y/"+class_name)
            while(1):
                if threading.active_count() < self.max_thread:
                    break
                else:
                    print("线程池已满，正在等待其它线程退出...")
                    time.sleep(2)
            download_thread = threading.Thread(target=self.download_pic, args=(
                key, post_list[key], self.path + class_name,))  # 多线程下载
            download_thread.setDaemon(True)  # 设置守护进程
            download_thread.start()
            time.sleep(0.1)

    def download(self, class_id=0, start=1, end=1):
        if class_id > 2:
            print(f'class_id 只能为 0, 1, 2中的一个, 但得到{class_id}')
            sys.exit(0)
        if end < start or start < 1:
            print("起始页不能小于1, 结束页不能小于起始页")
            sys.exit(0)
        if not os.path.exists(self.path):
            os.mkdir(self.path)

        for i in range(start, end + 1):
            if class_id in [0, 1]:
                print(f'开始下载<新时代的我们>: 第{i}页')
                self.get_list('新时代的我们', f'{self.url1}{i}')
                self.pre_exit()
            if class_id in [0, 2]:
                print(f'开始下载<達蓋爾的旗幟>: 第{i}页')
                self.get_list('達蓋爾的旗幟', f'{self.url2}{i}')
                self.pre_exit()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--class_id', type=int, default=0,
                        help="'1' for 【新時代的我們】, '2' for 【達蓋爾的旗幟】, '0' for both")
    parser.add_argument('-s', '--start', type=int,
                        default=1, help="Page_start(default=1)")
    parser.add_argument('-e', '--end', type=int, default=1, help="Page_end")
    parser.add_argument('-m', '--max_thread', type=int,
                        default=300, help="Max thread num(default=300)")
    parser.add_argument('-p', '--noproxy', type=int, default=1,
                        help="'0': not use proxy; '1': use proxy; (default=1)")
    args = parser.parse_args()
    class_id = args.class_id
    start = args.start
    end = args.end

    T66y().download(class_id, start, end)
