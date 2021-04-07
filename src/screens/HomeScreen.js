import React from 'react'
import {useImage} from 'react-image'
import {Img} from 'react-image'
function HomeScreen() {
    function iframe() {
        return {
            __html: '<iframe src="products.html" width="540" height="450"></iframe>'
        }
    }

    return (
        <div>
 <div dangerouslySetInnerHTML={iframe()} />
        </div>
    )
}

export default HomeScreen
