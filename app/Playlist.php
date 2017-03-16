<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    //
	public function tracks()
	{
	    return $this->belongsToMany('App\Tracks', 'track_maps', 
	      'playlist_id', 'track_id');
	}

	public function added()
	{
		return $this->belongsTo('App\User', 'added_by');
	}
}
