<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tracks extends Model
{
    //
     protected $table = 'tracks';

	public function playlists()
	{
	    return $this->belongsToMany('App\Playlist', 'track_maps', 
	      'track_id', 'playlist_id');
	}
}
