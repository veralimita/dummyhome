upstream node_server_iot {
  server 127.0.0.1:3000;
  keepalive 64;
}

server {
  listen        80;
  server_name   iot.veralimita.com;

  location / {
    proxy_pass   http://node_server_iot;
    proxy_set_header    Host node_server_iot;
    proxy_redirect  http://node_server_iot/ $scheme://$host/;
    proxy_redirect  http://node_server_iot:3000/ $scheme://$host/;
    proxy_connect_timeout 360s;
  }

}