<div class="article">
	{if $a->image}
		<div class="image">
			<img src="{image folder='articles' name=$a->image size=$imageFormat}" alt="{$a->title}" title="{$a->title}" />
		</div>
	{/if}
	
	<div class="content">
		<h3 class="title">{$a->title}</h3>
	
		{if $datas.showDate}
			<span class="date">{formatDate date=$a->date_start format=$datas.dateFormat}</span>
		{/if}
		
		<div class="chapeau">
			{if $datas.truncateText != "0"}
				{$a->chapeau|truncate:$datas.truncateText}
			{else}
				{$a->chapeau|truncate}
			{/if}
		</div>

		{if $a->readmore}
			<a class="readmore" href="{routeFull route="articles" action="view" id=$a->id_article}">{t}Read more{/t}</a>
			<div class="clear"></div>
		{/if}
	</div>
</div>