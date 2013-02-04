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

		function goback() {
		history.go(-1);
		}
	</script>
	
	{appendFile type="jquery" src="/lib/jquery/jquery-1.7.1.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery-ui-1.8.16.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.easing.1.3.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/hoverIntent.min.js" cache="true"}
	{appendFile type="jquery" src="{$smarty.const.COMMON_LIB_PATH}/lib/bgiframe/jquery.bgiframe.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.scrollTo-min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.localscroll-min.js" cache="true"}	
	{appendFile type="jquery" src="{$smarty.const.COMMON_LIB_PATH}/lib/ajaxAidoo/script.js" cache="true"}
	{appendFile type="jquery" src="{$smarty.const.COMMON_LIB_PATH}/lib/fragmentHTML/script.js" cache="true"}
	{appendFile type="jquery" src="{$smarty.const.COMMON_LIB_PATH}/lib/jqueryBBQ/script.js" cache="true"}

	{appendFile type="css" src="/lib/resetcss/reset.min.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/base.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/content.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/design.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/blocs.css" cache="true"}
	
	<link rel="shortcut icon" type="image/x-icon" href="{$baseUrl}{$skinUrl}/img/favicon.ico" />

	<!--[if IE 7]>
	<link rel="stylesheet" href="{$skinUrl}/css/style_ie7.css" type="text/css" title="style" />
	<![endif]-->
	
	<!--[if gte IE 9]>
		<link rel="stylesheet" href="{$skinUrl}/css/ie9.css" type="text/css" title="style" />
	<![endif]-->

	{AppendCacheCssJs}

	{AppendJQueryLibs}
	
	{AppendJsFiles}
	{AppendJsScripts}
	
	<!-- TinyMCE -->
	{$AppendTinyMCE}
	
	{AppendCssFiles}
	{AppendCssScripts}
	
	{AppendHeadContent}
	
	{if $GoogleAnalyticsAccount}
		<script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', '{$GoogleAnalyticsAccount}']);
		  _gaq.push(['_trackPageview']);
		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
	{/if}
	
	<style>
		{if $template->bgType == 1}
			html {
				background-image: url({image folder="templates" name=$template->bgPicture});
				background-repeat: {if !$template->bgRepeat}no-repeat{else if $template->bgRepeat == 1}repeat-x{else if $template->bgRepeat == 2}repeat-y{else if $template->bgRepeat == 3}repeat{/if};
				background-position: top center;
				background-color: #{$template->bgColor1};
			}
		{else if $template->bgType == 2}
			html {
				background-color: #{$template->bgColor1};
			}
		{else if $template->bgType == 3}
		html {
			{if !$template->bgGradient}
				background: -webkit-gradient(linear, left top, left bottom, from(#{$template->bgColor1}), to(#{$template->bgColor2}));
				background: -moz-linear-gradient(top, #{$template->bgColor1}, #{$template->bgColor2});
				filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#{$template->bgColor1}, endColorstr=#{$template->bgColor2});
				-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#{$template->bgColor1}, endColorstr=#{$template->bgColor2})";
			{else}
				background: -webkit-gradient(linear, left top, right top, from(#{$template->bgColor1}), to(#{$template->bgColor2}), color-stop(0.7, #{$template->bgColor2}));
				background: -moz-linear-gradient(left top, #{$template->bgColor1}, #{$template->bgColor2} 70%);
				filter: progid:DXImageTransform.Microsoft.gradient(startColorStr=#{$template->bgColor1}, endColorStr=#{$template->bgColor2}, GradientType=1);
				-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#{$template->bgColor1}, endColorstr=#{$template->bgColor2}, GradientType=1)";
			{/if}
		}
		{/if}
	</style>
	
</head>

<body>

	<div id="global" class="template-{$template->id_template} {$template->classCss} {$template->theme}">
		<div id="container">
		
			{if $header1 || $header2}
			<div id="header" class="ph_horizontal">
				{if $header1}
					<div id="header1">{$header1}</div>

				{/if}

				{if $header2}
					<div id="header2">{$header2}<div class="clear"></div></div>
				
				{/if}
				<div class="clear"></div>
			</div>
			{/if}

			
			<div id="container_center">
				
				{if $sideleft1 || $sideleft2}
				<div id="sidebar_left"  class="ph_vertical">
					{if $sideleft1}
						<div id="sidebar_left1">{$sideleft1}</div>
					{/if}
					{if $sideleft2}
						<div id="sidebar_left2">{$sideleft2}</div>
					{/if}
				</div>
				{/if}
				
				<div id="container_content">
				
					{if $contenttop}
					<div id="content_top" class="ph_horizontal">
						<div id="content_top1">{$contenttop}</div>
						<div class="clear"></div>
					</div>
					{/if}

					{if $layout->content || $contentmore}
					<div id="content_middle">
						{if $contentleft}
							<div id="contentleft" class="ph_vertical">{$contentleft}</div>
						{/if}
						
						{if $layout->content || $contentmore}
							<div id="content">
								<div class="content-core-defaut">
									{$layout->content} {$contentmore}
									<div class="clear"></div>
								</div>
							</div>
						{/if}
						
						{if $contentright}
							<div id="contentright" class="ph_vertical">{$contentright}</div>
						{/if}
						<div class="clear"></div>
					</div>
					{/if}
					
					{if $contentbottom}
					<div id="contentbottom"  class="ph_horizontal">
						<div id="content_bottom1">{$contentbottom}</div>
					</div>

					{/if}
					
				</div>
			 
				{if $sideright1 || $sideright2}
				<div id="sidebar_right" class="ph_vertical">
					{if $sideright1}
						<div id="sidebar_right1">{$sideright1}</div>
					{/if}
					{if $sideright2}
						<div id="sidebar_right2">{$sideright2}</div>
					{/if}
				</div>
				{/if}
				<div class="clear"></div>
			</div>

			{if $footer1 || $footer2}
			<div id="footer"  class="ph_horizontal">
				{if $footer1}				
				<div id="footer1">{$footer1}</div>

				<div class="clear"></div>
				{/if}
				{if $footer2}	
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
