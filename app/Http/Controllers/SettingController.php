<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
 
    public function index()
    {
        //get setting
        $setting = Setting::latest()->first();
        return Inertia::render('Setting/Setting', [
            'setting' => $setting,
        ]);
    }
    public function update(Request $request,string $id)
    {
        // dd($request);
        try {
            $setting = Setting::findOrFail($id);
            $setting->return_days = $request->returndays;
            $setting->save();
            return redirect()->route('settings.index');
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['error' => $exception->getMessage()]);
        }
        
    }
}
