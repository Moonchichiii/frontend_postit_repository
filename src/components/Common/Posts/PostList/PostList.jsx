
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts } from '../PostContext/PostContext';
import Postcard from '../Cards/Cards';


const PostList = ({ searchTerm }) => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        const response = await fetchPosts(searchTerm, page);
        console.log("Fetched posts:", response);
        const newPosts = response.results; 
    
        if (newPosts.length === 0) {
            setHasMore(false);
            return;
        }
        setPosts([...posts, ...newPosts]);
        setPage(page + 1);
    };


    useEffect(() => {
        fetchMoreData();
    }, [searchTerm]);

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className='text-center m-2'>Loading...</h4>}
        >
            {posts.map(post => (
                <Postcard key={post.id} post={post} />
            ))}
        </InfiniteScroll>
    );
};

export default PostList;
