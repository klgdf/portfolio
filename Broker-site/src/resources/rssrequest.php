<?php
/**
*
* @var NUMBER - количество новостей
* @var $_GET['lang'] - язык новостей, мб: ['ru','en','cn','de','es','it','fr'] соответсвенно ['Русский', 'Английский', 'Китайский', 'Немецкий', 'Испанский', 'Итальянский', 'Французкий']
*
* Язык по умоланию Английский.
* К скрипту надо обращаться через GET запрос с одним парамметром lang
* Например:
*
* $.get('/rssrequest',{lang:'ru'},function(response){ var data = JSON.parse(response); console.log(data); });
*
* @return возвращает json строку с новостями. На js JSON.parse() надо преобразовать в массив и вывести на фронт
*/

const NUMBER = 9;

$lang = (isset($_GET['lang'])) ? (string)$_GET['lang'].'.' : '';
$link = ( $lang=='en.' ) ? 'https://investing.com/rss/news.rss' : 'https://'.$lang.'investing.com/rss/news.rss' ;

$xml = simplexml_load_file($link);

$parse = [];
$public = [];

for($i=0;$i<NUMBER;$i++)
{
	$obj = [
		'img_url' => (array)($xml->channel->item[$i]->enclosure['url'])[0],
		'title' => (array)($xml->channel->item[$i]->title)[0],
		'author' => (array)($xml->channel->item[$i]->author)[0],
		'date' => (array)($xml->channel->item[$i]->pubDate)[0],
		'link' => (array)($xml->channel->item[$i]->link)[0]
	];
	array_push($parse, $obj);
}

foreach( $parse as $news)
{
	$dateObj = isset($news['date'][0]) ? date_create($news['date'][0]) : '';
	$date = isset($news['date'][0]) ? date_format($dateObj,"d.m.Y H:i") : '';
	$obj = [
		'img_url' => isset($news['img_url'][0]) ? $news['img_url'][0] : '',
		'title' => isset($news['title'][0]) ? $news['title'][0] : '',
		'author' => isset($news['author'][0]) ? $news['author'][0] : '',
		'date' => $date,
		'link' => isset($news['link'][0]) ? $news['link'][0] : ''
	];
	array_push($public, $obj);
}

echo json_encode($public);
?>
