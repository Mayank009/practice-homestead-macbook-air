<?php

function html_emoji_decode($string)
{
	return preg_replace_callback(
		'/&#[0-9]{6};?/',
		function($match)
		{
			// if there's missing semi-colon at the end, we will add it
			$code = substr($match[0], -1) === ';' ? $match[0] : $match[0] . ';';

			return html_entity_decode($code); 
		},
		$string
	);
}

$string = 'This is &lt;&quot;HTML encoded&quot;&gt; string. But with an emoji &#128516; and &#127818.';

echo html_emoji_decode($string);