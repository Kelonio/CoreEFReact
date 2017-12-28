import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface BlogsState {
    blogs: Blog[];
    loading: boolean;
}

export class Blogs extends React.Component<RouteComponentProps<{}>, BlogsState> {
    constructor() {
        super();
        this.state = { blogs: [], loading: true };

        fetch('api/Blogs')
            .then(response => response.json() as Promise<Blog[]>)
            .then(data => {
                this.setState({ blogs: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Blogs.renderBlogssTable(this.state.blogs);

        return <div>
            <h1>Blogs</h1>
            <p>This component demonstrates fetching data from the server with EF.</p>
            { contents }
        </div>;
    }

    private static renderBlogssTable(blogs: Blog[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Url</th>
                    <th>Posts</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map(blog =>
                    <tr key={blog.blogId}>
                        <td>{blog.blogId}</td>
                        <td>{blog.url}</td>
                        <td>
                            <ul>
                            {blog.posts.map(
                                    post => <li>{post.title}</li>
                            )} 
                            </ul>
                        </td>
                    
                </tr>
            )}
            </tbody>
        </table>;
    }
}

interface Blog {
    blogId: number;
    url: string;
    posts: Post[];
}

interface Post {
    postId: number;
    title: string;
    content: string;
}
