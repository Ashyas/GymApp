import Video from '../../models/video';
import { DELETE_VIDEO, CREATE_VIDEO,  SET_VIDEOS } from '../action/videos';

const initialState = {
    availableVideos: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_VIDEOS:
            return {
                availableVideos: action.videos,
            };
        case CREATE_VIDEO:
            const newVideo = new Video(
                action.videoData.title,
                action.videoData.videoUri,

                );
                return {
                    ...state,
                    availableVideos: state.availableVideos.concat(newVideo),
                };

        case DELETE_VIDEO:
            return {
                ...state,
                availableVideos: state.availableVideos.filter(video => video.videoId !== action.vid),
            };
    } 
    return state;
};
