export async function client(endpoint,{body,...customconfig}={}){
    const headers = {'content/type':'application/json'}

    const config = {
        method: body ? 'POST' : 'GET',
        ...customconfig,
        headers: {
            ...headers,
            ...customconfig.headers,
        },
    }
    if(body){
        config.body = JSON.stringify(body)
    }

    let data 
    try {
        const response = await windows.fetch(endpoint,config)
        data = await response.json()
        if(response.ok){
            return data
        }
        throw new Error(response.statusText)
    }catch(err){
        return Promise.reject(err.message  ? err.message : data)
    }
}

client.get = function(endpoint,customConfig={} ){
    return client(endpoint, {...customConfig, method: 'GET'})
}

client.post = function (endpoint,body,customConfig = {}){
    return client(endpoint, {...customConfig,body})
}