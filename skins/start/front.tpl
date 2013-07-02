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
	
	<title>{$seoData->title}</title>
	{if $seoData->keywords}<meta name="keywords" content="{$seoData->keywords}" />{/if}
	{if $seoData->description}<meta name="description" content="{$seoData->description}" />{/if}
	
	<script type="text/javascript">
		var baseUrl = "{$baseUrl}";
		var skinUrl = "{$skinUrl}";
		var currentLangId = "{$smarty.const.CURRENT_LANG_ID}";
		var ajax_apiKey = "{$ajax_apiKey}";
		var commonLibUrl = "{$smarty.const.COMMON_LIB_PATH}";
	</script>
	
	{nocache}{AssetJs}
	<script src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/ajaxAidoo/script.js"></script>
	{/AssetJs}{/nocache}
	
	{AppendJQueryLibs}
	{AppendJsFiles}
	{AppendJsScripts}
	
	{nocache}{AssetCss}
	<link rel="stylesheet" href="/lib/resetcss/reset.min.css" type="text/css" />
	<link rel="stylesheet" href="{$skinUrl}/css/content.css" type="text/css" />
	<link rel="stylesheet" href="{$baseUrl}{$skinUrl}/css/base.css" type="text/css" />
	<link rel="stylesheet" href="{$baseUrl}{$skinUrl}/css/design.css" type="text/css" />
	<link rel="stylesheet" href="{$baseUrl}{$skinUrl}/css/blocs.css" type="text/css" />
	{/AssetCss}{/nocache}
	
	{AppendCssFiles}
	{AppendCssScripts}
	{$AppendTinyMCE}
	{AppendHeadContent}
	{GenerateStyleBackground}
	{AppendAnalyticsTracking}
	
	<link rel="shortcut icon" type="image/x-icon" href="{$baseUrl}{$skinUrl}/img/favicon.ico" />
	
</head>

<body>

	<div id="global" class="template-{$template->id_template} {$template->classCss} {$template->theme}">
		<div id="container">
		
			{if isset($header1) || isset($header2)}
			<div id="header" class="ph_horizontal">
				{if isset($header1)}
					<div id="header1">{$header1}</div>

				{/if}

				{if isset($header2)}
					<div id="header2">{$header2}<div class="clear"></div></div>
				{/if}
				<div class="clear"></div>
			</div>
			{/if}

			
			<div id="container_center">
				
				{if isset($sideleft1) || isset($sideleft2)}
				<div id="sidebar_left"  class="ph_vertical">
					{if isset($sideleft1)}
						<div id="sidebar_left1">{$sideleft1}</div>
					{/if}
					{if isset($sideleft2)}
						<div id="sidebar_left2">{$sideleft2}</div>
					{/if}
				</div>
				{/if}
				
				<div id="container_content">
				
					{if isset($contenttop)}
					<div id="content_top" class="ph_horizontal">
						<div id="content_top1">{$contenttop}</div>
						<div class="clear"></div>
					</div>
					{/if}

					{if isset($layout->content) || isset($contentmore)}
					<div id="content_middle">
						{if isset($contentleft)}
							<div id="contentleft" class="ph_vertical">{$contentleft}</div>
						{/if}
						
						<div id="content">
							<div class="content-core-defaut">
								{if isset($layout->content)}{$layout->content}{/if}
								{if isset($contentmore)}{$contentmore}{/if}
								<div class="clear"></div>
							</div>
						</div>
						
						{if isset($contentright)}
							<div id="contentright" class="ph_vertical">{$contentright}</div>
						{/if}
						<div class="clear"></div>
					</div>
					{/if}
					
					{if isset($contentbottom)}
					<div id="contentbottom"  class="ph_horizontal">
						<div id="content_bottom1">{$contentbottom}</div>
					</div>

					{/if}
					
				</div>
			 
				{if isset($sideright1) || isset($sideright2)}
				<div id="sidebar_right" class="ph_vertical">
					{if isset($sideright1)}
						<div id="sidebar_right1">{$sideright1}</div>
					{/if}
					{if isset($sideright2)}
						<div id="sidebar_right2">{$sideright2}</div>
					{/if}
				</div>
				{/if}
				<div class="clear"></div>
			</div>

			{if isset($footer1) || isset($footer2)}
			<div id="footer"  class="ph_horizontal">
				{if isset($footer1)}				
				<div id="footer1">{$footer1}</div>

				<div class="clear"></div>
				{/if}
				{if isset($footer2)}	
				<div id="footer2">{$footer2}</div>
				{/if}
				<div class="clear"></div>
			</div>
			{/if}
			
		</div>
		<div class="clear"></div>
	</div>
	
	<!-- BottomScripts -->
	{AppendJsScriptsBottom}
	
</body>
</html>