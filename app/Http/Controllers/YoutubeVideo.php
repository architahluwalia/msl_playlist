<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Alaouy\Youtube\Facades\Youtube;

use App\Http\Requests;

class YoutubeVideo extends Controller
{
    //

    public function getVideoSearch($query, $token = null)
    {
        // $videoList = Youtube::searchVideos($query);
        // dd($query);
        $params = array(
            'q'             => $query,
            'type'          => 'video',
            'part'          => 'id, snippet',
            'maxResults'    => 6,
            'videoCategoryId' => '10'
        );

        // $pageTokens = array();

        $search = Youtube::paginateResults($params, $token);
        $pageToken = $search['info']['nextPageToken'];
        $results = $search['results'];
        // $search = Youtube::paginateResults($params, $pageTokens[0]);

        // $pageTokens[] = $search['info']['nextPageToken'];

        // $search = Youtube::paginateResults($params, $pageTokens[1]);

        // // Store token
        // $pageTokens[] = $search['info']['nextPageToken'];

        // // Go back a page
        // $search = Youtube::paginateResults($params, $pageTokens[0]);

        
        // Add results key with ingres_fetch_object() parameter set
        // print_r($search['results']);
        return response()->success(compact('results', 'pageToken'));
    }
}
