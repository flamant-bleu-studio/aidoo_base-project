<div class="view_article">


	{* FB Like button + FB comment *}
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId={$smarty.const.FACEBOOK_APPID}";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
	
	{* Twitter Button *}
	<script>
	!function(d,s,id){
		var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){
				js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);
			}
		}(document,"script","twitter-wjs");
	</script>

	<h1 class="title">{$doc->title}</h1>
	
	{if $doc->image}
		<div class="image"><img src="{image folder='articles' name=$doc->image size=$size}" /></div>
	{/if}
	
	<div class="chapeau">{$doc->chapeau}</div>
	
	<div class="video">
		{if $doc->nodes->website == 'Youtube'}
			<iframe width="{$doc->nodes->width_vid_page}" height="{$doc->nodes->height_vid_page}" src="http://www.youtube.com/embed/{$doc->nodes->url_video}" frameborder="0" ></iframe>
		{else if $doc->nodes->website == 'Vimeo'}
			<iframe width="{$doc->nodes->width_vid_page}" height="{$doc->nodes->height_vid_page}" src="http://player.vimeo.com/video/{$doc->nodes->url_video}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		{else if $doc->nodes->website == 'Metacafe'}
			<embed width="{$doc->nodes->width_vid_page}" height="{$doc->nodes->height_vid_page}"  flashVars="playerVars=autoPlay=no" src="http://www.metacafe.com/fplayer/{$doc->nodes->url_video}/1.swf" wmode="transparent" allowFullScreen="true" allowScriptAccess="always"  pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>
		{else if $doc->nodes->website == 'Veoh'}
			<embed width="{$doc->nodes->width_vid_page}" height="{$doc->nodes->height_vid_page}" src="http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1390&permalinkId={$doc->nodes->url_video}&player=videodetailsembedded&videoAutoPlay=0&id=anonymous" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" id="veohFlashPlayerEmbed" name="veohFlashPlayerEmbed"></embed>
		{/if} 
	</div>
	
		
	{if $author}
		<div class="author">{t}Written by{/t} <a href="{routeFull route="users" action="view" page=$author->id}">{$author->getPublicName()}<a></div>
	{/if}
	
	<div class="date">{formatDate format="EEEE F" date=$doc->date_start}</div>
	
	<div class="footer_article">
		<div class="categories">
			{foreach from=$doc->categories item=cat}
				<a href="{routeShort action="cat" id=$cat->id_categorie}">{$cat->title}</a>
			{/foreach}
		</div>
		
		{if $doc->fb_comments_active && $fb_comments_active}
			<div class="nb_com_fb">
				{$comment_count} {t}comment{/t}{if $comment_count > 1}s{/if}
			</div>
		{/if}
		<div class="share">
			<a href="https://twitter.com/share" class="twitter-share-button"></a>
		</div>
		<div class="share">
			<div class="fb-like" data-send="false" data-layout="button_count"  data-show-faces="false"></div>
		</div>
		
		<div class="clear"></div>
	</div>
	
	{if $doc->fb_comments_active && $fb_comments_active}
		<div class="fb-comments" data-href="{$smarty.server.SERVER_NAME}/articles/view/{$doc->id_article}" data-num-posts="{$fb_comments_number}" data-width="{$fb_comments_width}" data-colorscheme="{if $fb_comments_color}{$fb_comments_color}{else}light{/if}"></div>
	{/if}
			
</div>
