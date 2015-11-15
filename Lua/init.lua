-- Implementar um cliente padrao para o módulo ESP8266

serverPort = 1010
hostPort = 8080
WIFI_SSID = "celpaulo"
WIFI_PASS = "aaaa1234"

-- Prepara I/O
led1 = 3
led2 = 4
gpio.mode(led1, gpio.OUTPUT)
gpio.mode(led2, gpio.OUTPUT)

-- Conecta na WIFI
wifi.setmode(wifi.STATION)

wifi.sta.config(WIFI_SSID, WIFI_PASS)

print(wifi.sta.getip())

-- Inicia registro do host no servidor
tmr.alarm(0, 5000, 1, function()
	print("5 seconds pass")
	conn = net.createConnection(net.UDP, 0)
	conn:on("receive", function(su,c) 
		print(c) 
	end) 
	conn:connect(serverPort, "192.168.43.188")
	conn:send('{"hostId":"1FCCC","type":"OUTPUT","hostPort":"' .. hostPort .. '","capabilities":{"relay":5,"sensor":0}}')
	conn:close()
	conn = nil
end)


-- Inicia servidor de retorno para confirmar registro
tmr.alarm(1, 2000, 0, function()
	srv=net.createServer(net.TCP)
	srv:listen(hostPort, function(conn)
	    conn:on("receive", function(client, request)
		local buf = "HTTP/1.1 200 OK\nContent-Type: text/html\n\nOK\n";
		tmr.stop(0)
		client:send(buf)
		client:close()
		collectgarbage()
	    end)
	end)
end)

