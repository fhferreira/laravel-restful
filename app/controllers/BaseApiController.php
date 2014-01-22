<?php

class BaseApiController extends BaseController {
    public function __construct()
    {
        //$this->beforeFilter('auth');
    }

    /**
     * Catch-all method for requests that can't be matched.
     *
     * @param  string    $method
     * @param  array     $parameters
     * @return Response
     * */
    public function missingMethod($parameters = array()) {
        $resp = RestResponseFactory::notfound("", "Method doesn't exists.");
        return Response::json($resp);
    }
}
