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

{capture name="mois"}
	{formatDate format="MMM" date=$doc->date_start}
{/capture}

	<div class="header">
		<div class="date_article left"><span class="date_mois">{$smarty.capture.mois|replace:".":""}</span><br /><span class="date_jour">{formatDate format="d" date=$doc->date_start}</span><br /><span class="date_annee">{formatDate format="YYYY" date=$doc->date_start}</span></div>
		<h1 class="title">{$doc->title}</h1>
	</div>
	
	<div class="content_all">
		
		{if $doc->image}
		<div class="image">
			<img src="{image folder='articles' name=$doc->image size=$size}" />
		</div>
		{/if}
		
		<div class="chapeau">{$doc->chapeau}</div>
		
		<div class="content">{$doc->nodes->content}</div>
		
		{if $author}
			<div class="author">{t}Written by{/t} <a href="{routeFull route="users" action="view" page=$author->id}">{$author->getPublicName()}<a></div>
		{/if}
		
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
		
		{if $smarty.server.HTTP_REFERER|escape:'htmlall':'UTF-8'}
			<div id="btn_go_back">
				<a class="btn_type1" href="{$smarty.server.HTTP_REFERER|escape:'htmlall':'UTF-8'}">{t}Back{/t}</a>
			</div>
		{/if}
		
		<div class="clear"></div>
	</div>
	
</div>
