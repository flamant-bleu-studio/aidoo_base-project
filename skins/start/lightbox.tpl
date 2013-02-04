{*
* CMS Aïdoo
* 
* Copyright (C) 2013  Flamant Bleu Studio
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* Lesser General Public License for more details.
* 
* You should have received a copy of the GNU Lesser General Public
* License along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
*}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript">
		var baseUrl = "{$baseUrl}";
		var skinUrl = "{$skinUrl}";
	</script>
	
	{appendFile type="jquery" src="/lib/jquery/jquery-1.7.1.min.js"}
	{appendFile type="jquery" src="/lib/jquery/jquery-ui-1.8.16.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.easing.1.3.min.js"}
	{appendFile type="jquery" src="/lib/jquery/hoverIntent.min.js"}
	{appendFile type="jquery" src="{$smarty.const.COMMON_LIB_PATH}/lib/bgiframe/jquery.bgiframe.min.js"}
	{appendFile type="jquery" src="/lib/jquery/jquery.scrollTo-min.js"}
	{appendFile type="jquery" src="/lib/jquery/jquery.localscroll-min.js"}	

	<!-- website Style sheets -->
	{appendFile type="css" src="/lib/resetcss/reset.min.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/content.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/design.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/base.css" cache="true"}
    
    
    <!-- Jquery + Libs-->
	{AppendJQueryLibs}

	<!-- JS Addons -->
	{AppendJsFiles}
	{AppendJsScripts}
	
	<!-- CSS Addons -->
	{AppendCssFiles}
	{AppendCssScripts}
	
</head>

<body>

		<div id="content_page">  	
			{$layout->content}      
			<div class="clear"></div>
		</div>


<!-- BottomScripts -->
{AppendJsScriptsBottom}

</body>
</html>

