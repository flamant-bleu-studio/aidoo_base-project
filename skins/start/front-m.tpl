<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>{$seoData->title}</title>
	<meta name="keywords" content="{$seoData->keywords}" />
	<meta name="description" content="{$seoData->description}" />

	<script type="text/javascript">
		var baseUrl = "{$baseUrl}";
		var skinUrl = "{$skinUrl}";
		var currentLangId = "{$smarty.const.CURRENT_LANG_ID}";
	</script>
	
	<script  type="text/javascript">
		function goback() {
		history.go(-1);
		}
	</script>
	{appendFile type="jquery" src="/lib/jquery/jquery-1.7.1.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery-ui-1.8.16.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.easing.1.3.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/hoverIntent.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.bgiframe.min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.scrollTo-min.js" cache="true"}
	{appendFile type="jquery" src="/lib/jquery/jquery.localscroll-min.js" cache="true"}	
		
	<!-- Mobiles -->
	{appendFile type="css" src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery.mobile/jquery.mobile-1.1.0.min.css" cache="true"}
	{appendFile type="jquery" src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery.mobile/jquery.mobile-1.1.0.min.js" cache="true"}
	
	{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/photoSwipe/3.0.5/lib/klass.min.js" cache="true"}	
	{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/photoSwipe/3.0.5/code.photoswipe-3.0.5.min.js" cache="true"}	
	{appendFile type="css" src="{$smarty.const.COMMON_LIB_PATH}/lib/photoSwipe/3.0.5/photoswipe.css" cache="true"}	
	
	{appendFile type="css" src="/lib/resetcss/reset.min.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/content.css" cache="true"}
	{appendFile type="css" src="{$skinUrl}/css/design_mobile.css?t=7654" cache="true"}


	{AppendCacheCssJs}

	{AppendJQueryLibs}
	
	{AppendJsFiles}
	{AppendJsScripts}

	{AppendCssFiles}
	{AppendCssScripts}
			
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
		
	
</head>

<body>

	<div data-role="page" id="global" class="template-{$template->id_template} {$template->classCss} {$template->theme}">
	
		{if $smarty.const.ISHOME !== true}
		<div data-role="header" data-theme="c">
			<a data-icon="arrow-l" data-rel="back" href="#">Retour</a>
			<h1 class="ui-title" tabindex="0" role="heading" aria-level="1"></h1>
		</div>
		{/if}

		
		<div data-role="content" id="container">
			{if isset($header1) || isset($header2)}
			<div id="header" class="ph_horizontal">
				{if isset($header1)}
					<div id="header1">{$header1}</div>
					<div class="clear"></div>
				{/if}

				{if isset($header2)}
					<div id="header2">{$header2}<div class="clear"></div></div>
				
				{/if}
				<div class="clear"></div>
			</div>
			{/if}

			
			<div data-role="content" id="container_center">
				
				<div id="container_content">
				
					{if isset($contenttop)}
					<div id="content_top" class="ph_horizontal">
						<div id="content_top1">{$contenttop}</div>
					</div>
					{/if}

					{if isset($layout->content) || isset($contentmore)}
					<div id="content_middle">
						{if $contentleft}
							<div id="contentleft" class="ph_vertical">{$contentleft}</div>
						{/if}
						
						<div id="content">
							{if isset($layout->content)}{$layout->content}{/if}
							{if isset($contentmore)}{$contentmore}{/if}
							<div class="clear"></div>
						</div>
						
						{if isset($contentright)}
							<div id="contentright" class="ph_vertical">{$contentright}</div>
						{/if}
						<div class="clear"></div>
					</div>
					{/if}
					
					{if isset($contentbottom)}
					<div id="contentbottom"  class="ph_horizontal">
						<div id="contentbottom">{$contentbottom}</div>
					</div>

					{/if}
					
				</div>

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

