<?php

function lastQ($print = true) {
    $queries = DB::getQueryLog();
    $last_query = end($queries);
    if ($print) {
        echo $last_query;
    }
    return $last_query;
}

function pp($thing) {
    echo "<pre>";
    print_r($thing);
    echo "</pre>";
}

function mapByField($collections, $fieldName) {
    $map = array();
    foreach ($collections as $o) {
        $map[$o->{$fieldName}] = $o;
    }
    return $map;
}

function pluck($fieldName, $collections)
{
    $arr = array();
    foreach ($collections as $o) {
        $arr[] = $o->{$fieldName};
    }
    return $arr;
}

function implodeOnField($separator, $collections, $fieldName) {
    $arr = array();
    foreach ($collections as $o) {
        $arr[] = $o->{$fieldName};
    }
    return implode($separator, $arr);
}
