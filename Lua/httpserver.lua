-- Implementar um cliente padrao para o módulo ESP8266

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
		
		print("Método: " .. getHttpMethod(request))
		print("Path: " .. getHttpUrl(request))
		print("FormData: ")
		for key, value in pairs(getFormPostData(request)) do
			print("chave: " .. key)
			--print("valor: " .. value)
		end
	    end)
	end)
end)

function getHttpMethod(request)
	local array = splitArray(request, "\r\n")
	local firstLine = array[1]

	-- Obtém método HTTP
	local words = splitArray(firstLine, " ")
	return words[1]
end

function getHttpUrl(request)
	local array = splitArray(request, "\r\n")
	local firstLine = array[1]

	-- Obtém método HTTP
	local words = splitArray(firstLine, " ")
	return words[2]
end

function getFormPostData(request)
	local table = splitArray(request, "\r\n\r\n")
	-- # retorna o tamanho da tabela associativa
	local postFormUrlencodedData = table[#table]
	local postItems = splitArray(postFormUrlencodedData, "&")

	local returnItems = {}
	
	for key, value in pairs(postItems) do
		local itemData = splitArray(value, "=")

		local t = {}
		t[itemData[1]] = itemData[2] 

		returnItems[#table + 1] = t
	end

	return returnItems
end


-- Divide string por um separador e retorna um array
function splitArray(str, sep)
    local array = {}
    local reg = string.format("([^%s]+)",sep)
    for mem in string.gmatch(str,reg) do
        table.insert(array, mem)
    end
    return array
end




