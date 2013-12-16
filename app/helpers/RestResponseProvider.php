<?php

    class RestResponseProvider {
        //200
        public static function ok($payload = "", $message = "") {
            return new RestResponse('ok', $message, $payload);
        }
        
        //400
        public static function badrequest($payload = "", $message = "") {
            return new RestResponse('badrequest', $message, $payload);
        }
        
        //401
        public static function unauthorized($payload = "", $message = "") {
            return new RestResponse('unauthorized', $message, $payload);
        }

        //403
        public static function forbidden($payload = "", $message = "") {
            return new RestResponse('forbidden', $message, $payload);
        }

        //404
        public static function notfound($payload = "", $message = "") {
            return new RestResponse('notfound', $message, $payload);
        }

        //500
        public static function error($payload = "", $message = "") {
            return new RestResponse('error', $message, $payload);
        }
    }
