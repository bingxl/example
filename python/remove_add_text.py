import os
import argparse

def remove_add_text(dir2, add_text):
    '''递归删除特定广告文本

    递归检查指定目录下的所有文件及子目录，将目录名与文件名中包含的广告词删除

    Parameters:
    -----
    dir2: str
        指定要检查的目录
    add_text: str
        指定要删除的广告词
    '''

    # 如果dir2不是目录直接返回
    if not os.path.isdir(dir2):
        return
    
    if not dir2.endswith(os.path.sep):
        dir2 += os.path.sep
    
    names = os.listdir(dir2)

    for name in names:
        sub_path = os.path.join(dir2, name)

        # 子目录递归处理
        if os.path.isdir(sub_path):
            remove_add_text(sub_path, add_text)
        
        # 删除广告词
        name = name.replace(add_text, '')
        new_path = os.path.join(dir2, name)

        # 重命名文件
        os.rename(sub_path, new_path)
    pass

def add_add_text(dir2, add_text):
    '''将指定目录下所有文件和目录添加给定的广告词
    
    Parameters
    -----
    dir2: str
        指定的目录
    add_text: str
        广告词
    '''
    if not os.path.isdir(dir2):
        return
    if not dir2.endswith(os.path.sep):
        dir2 += os.path.sep
        pass
    names = os.listdir(dir2)


    for name in names:
        sub_path = os.path.join(dir2, name)
        if os.path.isdir(sub_path):
            add_add_text(sub_path, add_text)
            pass
        name = add_text + name
        new_path = os.path.join(dir2, name)
        os.rename(sub_path, new_path)
    pass
if __name__ == '__main__':
    parse = argparse.ArgumentParser(description="递归添加或删除指定目录中的广告词")
    parse.add_argument('--dir', required=True, dest='dir2', help='递归处理的根目录')
    parse.add_argument('--text', required=True, dest='add_text', help='添加或删除的文本内容')
    parse.add_argument('--o', required=False, dest='operation', default='remove', choices=['remove', 'add'], help='执行的操作，remove：删除， add：添加')

    arg = parse.parse_args()
    print(arg.dir2)
    if arg.operation == 'remove':
        remove_add_text(arg.dir2, arg.add_text)
    if arg.operation == 'add':
        add_add_text(arg.dir2, arg.add_text)
        pass