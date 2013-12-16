<?php

    class RestResponse {
        public $code;
        public $status;
        public $message;
        public $payload;

        public function __construct($status, $message, $payload) {
            $this->status = $status;
            switch ($status) {
                case 'ok': 
                    $this->code = 200;
                    if ($message == "") {
                        $message = "OK";
                    }
                    break;
                case 'redirect': 
                    $this->code = 302;
                    if ($message == "") {
                        $message = "Redirect";
                    }
                    break;
                case 'badrequest': 
                    $this->code = 400;
                    if ($message == "") {
                        $message = "Bad Request";
                    }
                    break;
                case 'unauthorized': 
                    $this->code = 401;
                    if ($message == "") {
                        $message = "Unauthorized";
                    }
                    break;
                case 'forbidden': 
                    $this->code = 403;
                    if ($message == "") {
                        $message = "Forbidden";
                    }
                    break;
                case 'notfound':
                    $this->code = 404;
                    break;
                case '500':
                    $this->code = 500;
                    break;
                default:
                    throw new Exception('RestResponse Exception: Status not supported.');
                break;
            }
            $this->message = $message;
            $this->payload = $payload;
        }

        public function toJSON() {
            return json_encode($this);
        }
    }
