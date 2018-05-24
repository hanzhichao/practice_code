from spyne import Application, rpc, ServiceBase
from spyne import Integer, Unicode, Array, ComplexModel
from spyne.server.wsgi import WsgiApplication
from spyne.protocol.soap import Soap11
from wsgiref.simple_server import make_server
import sys

class DemoService(ServiceBase):
    @rpc(Unicode, Unicode, _returns=Unicode)
    def make_project(self, name, version):
        pass


if __name__ == '__main__':
    soap_app = Application([DemoService], 'DemoService', in_protocol=Soap11(validator="lxml"), out_protocol=Soap11())
    wsgi_app = WsgiApplication(soap_app)
    server = make_server('127.0.0.1', 5001, wsgi_app)

    sys.exit(server.serve_forever())
