
import Video from '../../models/video';

export const DELETE_VIDEO = 'DELETE_VIDEO';
export const CREATE_VIDEO = 'CREATE_VIDEO';
export const SET_VIDEOS = 'SET_VIDEOS';

export const fetchVideos = () => {
    return async dispatch => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/videos.json');
        const resData = await response.json();
        const loadedVideos = [];
        for (const key in resData ) {
            loadedVideos.push(new Video(
                key,
                resData[key].title,
                resData[key].videoUri,
               )
            );
        }
        dispatch ({type: SET_VIDEOS, videos: loadedVideos });
    };
};

export const deleteVideo= videoId => {
    return async dispatch => {
        await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/videos/${videoId}.json`, {
            method: 'DELETE',
        });
    dispatch ({type: DELETE_VIDEO, vid: videoId});    
  };
 };
    
export const createVideo = (title, videoUri) => {
    return async dispatch => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/videos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                videoUri,
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_VIDEO, videoData: { videoId: resData.name, title, videoUri } 
        });
    };
};



