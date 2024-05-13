<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Publisher;
use Illuminate\Http\Request;

class PublisherAPIController extends Controller
{
    public function getPublisherList(Request $request)
    {
        $publishers = Publisher::searchPublisher($request->q ?? "")->latest()->paginate(5);
        return response()->json($publishers,200);
    }
}
