<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Playlist;
use App\Tracks as Track;
use Auth;
use App\Http\Requests;

class PlaylistController extends Controller
{
    //
    public function getIndex($type = 'back')
    {
        if ($type == 'front') {
            $playlists = Playlist::select('id', 'name', 'added_by', 'created_at')
            ->with(['added' => function ($q) {
                $q->select('id', 'name');
            }])
            ->orderBy('created_at', 'desc')
            ->get();
        } else {
            $user = Auth::user();
            $playlists = Playlist::where('added_by', $user->id)->select('id', 'name', 'added_by')->get();
        }
        return response()->success(compact('playlists'));
    }

    public function deletePlaylist($id)
    {

        $playlist = Playlist::find($id);
        $playlist->tracks()->detach();
        $playlist->delete();
    }

    public function getPlaylist($id)
    {
        $playlist = Playlist::select('id', 'name')->with('tracks')->find($id);
        return response()->success($playlist);
    }

    public function postPlaylist(Request $request)
    {
        $user=  Auth::user();
        $data = $request->all();

        if (isset($data['id'])) {
            $playlist = Playlist::find($data['id']);
            $exist = Playlist::where('name', $data['name'])->where('added_by', $user->id)->where('id', '<>', $data['id'])->first();
        } else {
            $user = Auth::user();
            $playlist = new Playlist();
            $playlist->added_by = $user->id;
            $exist = Playlist::where('name', $data['name'])->where('added_by', $user->id)->first();
        }
        if ($exist) {
            return response()->error('You already have a playlist with the same name!');
        }
        $playlist->name = $data['name'];
        $playlist->save();
        if (isset($data['unchecked'])) {
            foreach ($data['unchecked'] as $removeTrack) {
                $playlist->tracks()->detach($removeTrack);
            }
        }
    }

    public function postAddToPlaylist(Request $request)
    {
        $user = Auth::user();
        $playlists = $request->playlists;
        $videoId = $request->track;
        $title = $request->title;
        $track = Track::where('video_id', $videoId)->first();

        if ($track) {
            $trackId = $track->id;
        } else {
            $track = new Track();
            $track->video_id = $videoId;
            $track->title = $title;
            $track->save();
            $trackId = $track->id;
        }
        
        $existing = Playlist::select('id')
        ->where('added_by', $user->id)
        ->whereHas('tracks', function ($q) use ($trackId) {
            $q->where('video_id', $trackId);
        })
        ->get();
        foreach ($existing as $play) {
            $key = array_search($play->id, $playlists);
            if ($key) {
                array_splice($playlists, $key, 1);
            } else {
                $play->tracks()->detach($trackId);
            }
        }

        foreach ($playlists as $addPLay) {
            $track->playlists()->attach($addPLay);
        }
    }

    public function getPlaylistByTrack($trackId)
    {
        $user = Auth::user();
        $playlists = Playlist::select('id', 'name')
        ->where('added_by', $user->id)
        ->whereHas('tracks', function ($q) use ($trackId) {
            $q->where('video_id', $trackId);
        })
        ->get();

        return response()->success($playlists);
    }
}
