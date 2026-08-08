import ssl
import socket
from urllib.parse import urlparse


def check(url: str):
    try:
        hostname = urlparse(url).hostname

        if not hostname:
            return -20, "Invalid Hostname"

        context = ssl.create_default_context()

        with socket.create_connection((hostname, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname):
                pass

        return 15, "Valid SSL Certificate"

    except Exception:
        return 0, "Invalid or Missing SSL Certificate"