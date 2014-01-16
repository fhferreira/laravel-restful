<?php

class ApiUploadController extends BaseApiController {

    /**
     *  @desc Upload
     **/
    public function upload()
    {
        $requestBody = file_get_contents('php://input');
        $request = json_decode($requestBody);

        if (Input::hasFile('file'))
        {
            $name = Input::file('file')->getClientOriginalName();
            $extension = Input::file('file')->getClientOriginalExtension();

            $destinationPath = public_path().'/uploads/';;
            $fn = Input::file('file')->move($destinationPath, $name);

            $url = url('uploads/' . $name);
            $resp = RestResponseProvider::ok(array(
                'url' => $url
            ));
        } else {
            $resp = RestResponseProvider::badrequest(null, "No file found");
        }
        return Response::json($resp);
    }
}
