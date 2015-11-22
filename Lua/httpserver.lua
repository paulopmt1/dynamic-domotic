-- Inclui funções para parsing http
dofile("httpparsing.lua")

serverPort = 1010
hostPort = 8080
WIFI_SSID = "celpaulo"
WIFI_PASS = "aaaa1234"

-- Conecta na WIFI
wifi.setmode(wifi.STATION)
wifi.sta.config(WIFI_SSID, WIFI_PASS)

-- Inicia servidor de retorno para confirmar registro
tmr.alarm(1, 3000, 0, function()
	print("Meu ip: " .. wifi.sta.getip())
	print("Servidor TCP iniciado na porta " .. hostPort)
	srv=net.createServer(net.TCP)
	srv:listen(hostPort, function(conn)
	    conn:on("receive", function(client, request)
		local buf = "HTTP/1.1 200 OK\nContent-Type: text/html\n\nOK\n"
    		
		-- tmr.stop(0)
		client:send(buf)
		client:close()
		collectgarbage()
		
		getHttpMethod(request)
		getHttpUrl(request)
		
--		print("Método: " .. getHttpMethod(request))
--		print("Path: " .. getHttpUrl(request))
		
		if getHttpMethod(request) == "POST" then
--			print("FormData: ")
			for key, value in pairs(getFormPostData(request)) do
--				print("chave: " .. key)
--				print("valor: " .. value)
			end
		else
--			print ("GetData: ")
			for key, value in pairs(getFormGetData(request)) do
--				print("chave: " .. key)
--				print("valor: " .. value)
			end
		end
	    end)
	end)
end)

