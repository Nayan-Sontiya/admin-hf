import React , {useState , useEffect} from 'react';
import SideNav from "../Common/SideNav";
import swal from 'sweetalert';
import { PostRequest , GetRequest} from '../ApiHandler/ApiHandler';
import { Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw , EditorState, convertFromHTML  } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import Heading from '../Common/Heading';
const About = () => {
    const [editorState, setEditorState] = useState('');
    const [pageId , setPageId] = useState('');
    const [editOrAdd , setEditOrAdd] =  useState('add');
    let _contentState = ContentState.createFromText('');
    const raw = convertToRaw(_contentState);
    const [contentState, setContentState] = useState(raw); // ContentState JSON
   
   let hashConfig = {
        trigger: '#',
        separator: ' ',
      }
    const content =  draftToHtml(
        contentState, 
        hashConfig, 
      );
    useEffect(()=>{
        getAboutUsData()
    },[])
   
    async function getAboutUsData() {
        let resp = await GetRequest("getpagecontent/about_us");
        if(resp.length !== 0){
            setPageId(resp[0]._id);
            setEditOrAdd('edit');
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(resp[0].content))))
        }
    }
    const aboutContentAdd = async (e) => {
        let item = { page_name : 'about_us', content: content }
        let resp = await PostRequest("addwebpage", item);
        if(resp._id !== undefined){
            swal({
                title: 'Success',
                text: 'About us data added successfully!',
                icon: 'success',
                button: 'Ok',
            })
        }
    };
    const aboutContentEdit = async (e) => {
        let item = { page_name : 'about_us', content: content }
        let resp = await PostRequest("editpagecontent/" + pageId, item);
        if(resp._id !== undefined){
            swal({
                title: 'Success',
                text: 'About us data edited successfully!',
                icon: 'success',
                button: 'Ok',
            })
        }
        
    };
    const reset = () => {
       window.location.reload();
    };
    return (
        <div className="page-content d-flex align-items-stretch">
        <div className="default-sidebar">
          <SideNav />
        </div>

        <div className="content-inner">
          <div className="container-fluid bgBlue">
          <Heading headingText="About us content" buttonComponent='' />
            <div className="row flex-row">
              <div className="col-xl-12">
                <div className="widget has-shadow">
                  <form action="" >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                       <h4 className='my-4 ml-3'>About Us Content Editor</h4>
                      </div>
                      <div className="editorButton ">
                        {editOrAdd === 'add' ?<button className='btn btn-success mr-3' type='button' onClick={aboutContentAdd}>Submit</button> : <button className='btn btn-success mr-3' type='button' onClick={aboutContentEdit}>Edit</button>}
                        <button className='btn btn-danger ' type='button' onClick={reset}>
                          Reset
                        </button>
                      </div>
                    </div>
                    <Editor
                      defaultContentState={contentState}
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      onContentStateChange={setContentState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    );
};

export default About;