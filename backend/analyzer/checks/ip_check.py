from urllib.parse import urlparse
import ipaddress


def check(url: str):
    hostname = urlparse(url).hostname or ""

    try:
        ipaddress.ip_address(hostname)
        return 0, "IP Address Used Instead of Domain"

    except ValueError:
        return 5, "Domain Name Used"