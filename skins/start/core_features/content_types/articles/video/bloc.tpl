<div class="article">
	{if $a->image}
		<div class="image">
			<img src="{image folder='articles' name=$a->image size=$imageFormat}" alt="{$a->title}" title="{$a->title}" />
		</div>
	{/if}
	
	<div class="content">
		<h3 class="title">
			<a href="{routeFull route="articles" action="view" id=$a->id_article}">
				{$a->title}
			</a>
		</h3>
		
			{if $a->nodes->website == 'Youtube'}
				<iframe width="{$a->nodes->width_vid_bloc}" height="{$a->nodes->height_vid_bloc}" src="http://www.youtube.com/embed/{$a->nodes->url_video}" frameborder="0" ></iframe>
			{else if $a->nodes->website == 'Vimeo'}
				<iframe width="{$a->nodes->width_vid_bloc}" height="{$a->nodes->height_vid_bloc}" src="http://player.vimeo.com/video/{$a->nodes->url_video}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
			{else if $a->nodes->website == 'Metacafe'}
				<embed width="{$a->nodes->width_vid_bloc}" height="{$a->nodes->height_vid_bloc}"  flashVars="playerVars=autoPlay=no" src="http://www.metacafe.com/fplayer/{$a->nodes->url_video}/1.swf" wmode="transparent" allowFullScreen="true" allowScriptAccess="always"  pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>
			{else if $a->nodes->website == 'Veoh'}
				<embed width="{$a->nodes->width_vid_bloc}" height="{$a->nodes->height_vid_bloc}" src="http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1390&permalinkId={$a->nodes->url_video}&player=videodetailsembedded&videoAutoPlay=0&id=anonymous" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" id="veohFlashPlayerEmbed" name="veohFlashPlayerEmbed"></embed>
			{/if} 
			
	</div>
</div>