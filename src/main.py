import multiprocessing

from window import start_window
from server import init_server

def run_processes(server_ip: str, server_port: int):
    conn_recv, conn_send = multiprocessing.Pipe()

    windows_process = multiprocessing.Process(target=start_window, args=(conn_send,))
    windows_process.start()
    
    server = init_server(server_ip, server_port)
    server.start()

    window_status = ''
    while 'closed' not in window_status:
        window_status = conn_recv.recv()

    server.stop()
    windows_process.join()



if __name__ == '__main__':
    server_ip = "127.0.0.1"
    server_port = 8080
    run_processes(server_ip, server_port)