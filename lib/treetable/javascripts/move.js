
	
	
function move_node(src, dst){
		
		var datas = {
			"src" 		: src,
			"dst" 		: dst
		};
		
		$.post(
			baseUrl+'/menu/ajax/move', 
			datas, 
			function(returnDatas) {
				
				if (!returnDatas['error']) 
				{
					if (returnDatas['message'])
						alert (returnDatas['message']);
				}
				else 
				{
					if (returnDatas['errormessage'])
					{
						alert(returnDatas['errormessage']);
					}
				}
			
			},
			"json"
		);
}

