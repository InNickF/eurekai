import multiprocessing
import logging
import sys

from uvicorn import Config, Server

def configure_logging():
    logger = multiprocessing.get_logger()
    logger.setLevel(logging.DEBUG)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    # Flush the handler after each log message
    handler.flush = sys.stdout.flush

class UvicornServer(multiprocessing.Process):

    def __init__(self, config: Config):
        super().__init__()
        self.server = Server(config=config)
        self.config = config

    def stop(self):
        self.terminate()

    def run(self, *args, **kwargs):
        configure_logging()
        self.server.run()

def init_server(server_ip: str, server_port: int):
    config = Config("api:app", host=server_ip, port=server_port, log_level="debug")
    server = UvicornServer(config=config)
    return server