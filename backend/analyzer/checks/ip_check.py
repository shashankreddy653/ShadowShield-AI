from urllib.parse import urlparse
import ipaddress


def check(url: str):
    hostname = urlparse(url).hostname or ""

    try:
        ipaddress.ip_address(hostname)
        return -20, "IP Address Used Instead of Domain"

    except ValueError:
        return 0, "Domain Name Used"