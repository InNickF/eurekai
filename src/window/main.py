import webview
import tempfile

def start_window(conn_send):
    def on_closed():
        # Stop the FastAPI app when the PyWebView window is closed
        conn_send.send('closed')

    html_content = """
    <html>
        <head>
            <title>Hello World</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
    </html>
    """

    win = webview.create_window('EurekAI', html=html_content)
    win.events.closed += on_closed
    webview.start(storage_path=tempfile.mkdtemp())