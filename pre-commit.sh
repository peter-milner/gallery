#!/bin/bash -xe

docker exec my-g /bin/sh -c "pylint app"

if [ $? -ne 0 ]; then
 echo "Tests must pass before commit!"
 exit 1
fi