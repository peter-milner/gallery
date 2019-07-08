#!/bin/bash -xe

docker exec my-g /bin/sh -c "cd .. && pylint app/*.py"
docker exec my-g /bin/sh -c "yarn run lint"

if [ $? -ne 0 ]; then
 echo "Tests must pass before commit!"
 exit 1
fi