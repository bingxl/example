'''
fabric 库用在远程服务器上执行命令
'''
from fabric import Connection
import argparse


def _argparse():
    '''
    解析传入的参数
    '''
    parser = argparse.ArgumentParser(description="参数描述")
    parser.add_argument('--host', action='store',
                        dest='host', help="服务器的域名或ip", required=True)
    parser.add_argument('--password', action='store',
                        dest='password', help='登录密码', required=True)
    parser.add_argument('--user', action='store',
                        dest='user', help='登录用户名', required=True)
    return parser.parse_args()


class Server:
    def __init__(self, config):
        '''
        初始化服务器链接
        '''
        self.conn = Connection(
            host=config.host,
            user=config.user,
            connect_kwargs={
                "password": config.password
            }
        )

    def exec(self, command):
        '''
        执行远程命令
        '''
        return self.conn.run(command, hide=True)

    def close(self):
        '''
        关闭远程链接
        '''
        self.conn.close()


def main():
    server = Server(_argparse())
    print(server.exec('ls /').stdout)
    server.close()


if __name__ == '__main__':
    main()
