-- Obtém variáveis do get
function getFormGetData(request)
	local table = splitArray(getFirstLineFromRequest(request), "?")
	-- Ignora versão HTTP
	local data = splitArray(table[#table], " ")
	return getStringUrlEncoded(data[1])
end

-- Obtém variáveis do post quando codificados com x-www-form-urlencoded
function getFormPostData(request)
	local table = splitArray(request, "\r\n\r\n")
	-- Os dados do post estão na última linha
	local postFormUrlencodedData = table[#table]
	return getStringUrlEncoded(postFormUrlencodedData)
end

-- Obtém método HTTP (ex.: GET | POST)
function getHttpMethod(request)
	local words = splitArray(getFirstLineFromRequest(request), " ")
	return words[1]
end

-- Obtém url do HTTP request (ex.: /home/?test=1)
function getHttpUrl(request)
	local words = splitArray(getFirstLineFromRequest(request), " ")
	return words[2]
end



function getFirstLineFromRequest(request)
	local array = splitArray(request, "\r\n")
	return array[1]
end

-- Cria um array associativo sendo a chave o nome da variável e o seu valor
-- Ex.: test1=1&test2=2 irá retornar um array (php like) assim: test1 => 1, test2 = 2
function getStringUrlEncoded(string)
	local items = splitArray(string, "&")
	
	local returnItems = {}
	
	for key, value in pairs(items) do
		local itemData = splitArray(value, "=")
		returnItems[itemData[1]] = itemData[2] 
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
