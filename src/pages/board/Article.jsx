import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, User } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function Article() {
  const {postId} = useParams();
  const token = sessionStorage.getItem('aivle19_token')
  const loginUser = sessionStorage.getItem('aivle19_username')
  const [articleData, setArticleData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [writeComment, setWriteComment] = useState('')
  const onCommentHandler = (e) => {
    setWriteComment(e.currentTarget.value);
  };
  const [editing, setEditing] = useState({});

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/board/${postId}/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
         })
            .then(response => {
                setArticleData(response.data);
            })
            .catch(error => {
                console.error("게시글 불러오기 실패", error);
            });

        axios.get(`http://127.0.0.1:8000/board/${postId}/comments/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
          })
            .then(response => {
                setCommentData(response.data);
            })
            .catch(error => {
                console.error("댓글 불러오기 실패", error);
            });
    }, [postId]);

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/board/${postId}/comments/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
        });
        setCommentData(response.data);
      } catch (error) {
          console.error("댓글 불러오기 실패", error);
      }
    }

    const onSubmitHandler = async (e) => {
      e.preventDefault()
      let req = {
          comment: writeComment,
      };

      try {
        const response = await axios.post(`http://127.0.0.1:8000/board/${postId}/comments/`, req, {
          headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
          }
        });
        console.log('write comment successful');
        setWriteComment('');
        fetchComments();
      } catch (error) {
          console.error('write comment error:', error);
      };
    }

    const onDeleteCommentHandler = async (postId, commentId) => {
      const url = `http://127.0.0.1:8000/board/${postId}/comments/${commentId}/`;
      try {
          const response = await axios.delete(url, {
            headers: {
              'Authorization': `Token ${token}`
          }
          });
          fetchComments();
      } catch (error) {
          console.error(error);
      }
    }

  // 각 댓글의 모달 상태를 관리하는 객체
  const [modalOpenStates, setModalOpenStates] = useState({});

  // 모달 열기 함수
  const openModal = (commentId) => {
    setModalOpenStates(prev => ({ ...prev, [commentId]: true }));
  };

  // 모달 닫기 함수
  const closeModal = (commentId) => {
    setModalOpenStates(prev => ({ ...prev, [commentId]: false }));
  };

  // 모달이 열려있는지 확인하는 함수
  const isModalOpen = (commentId) => {
    return modalOpenStates[commentId] || false;
  };

  const onUpdateCommentHandler = async (postId, commentId) => {
    const url = `http://127.0.0.1:8000/board/${postId}/comments/${commentId}/`;
    let req = {
      comment: editing,
    };
    try {
        const response = await axios.put(url, req, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setEditing({...editing, [commentId]: false})
        fetchComments();
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div style={{padding:'63px', paddingLeft:'270px', paddingRight:'270px'}}>
      <div style={{paddingBottom:'63px'}}>
        <div>
          <h1 style={{fontSize: "3em", fontWeight: 'bold'}}>{articleData.title}</h1>
        </div>
        <br />
        <span className="user">{articleData.user}</span>
        <span> · </span>
        <span>{new Date(articleData.created_at).toLocaleString()}</span>
      </div>

      <div style={{paddingBottom: '55px'}}>
        {articleData.content}
      </div>
      <hr />

      <div style={{paddingTop: '40px', paddingBottom: '60px'}}>
        <h1 style={{fontSize: "1.3em", fontWeight: 'bold', paddingBottom:'18px'}}>댓글</h1>
        <div className="w-full" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Textarea
            variant='bordered'
            radius="sm"
            value={writeComment}
            onChange={onCommentHandler}
            placeholder="댓글을 작성하세요"
          />
          <Button onClick={onSubmitHandler} color="secondary" auto style={{marginTop: '10px'}}>댓글 작성</Button>
        </div>
      </div>

      <div>
        {commentData.map((comment) => (
          <div key={comment.comment_id} style={{paddingBottom:'30px', position: 'relative'}}>
            <User   
              name={comment.user}
              description={new Date(comment.created_at).toLocaleString()}
              avatarProps= {{
                src: `http://127.0.0.1:8000${comment.image}`
              }}
            />
          
          {editing[comment.comment_id] ? (
            <Textarea
              variant="bordered"
              defaultValue={comment.comment}
              className="max-w"
            />
          ) : (
            <Textarea
              isReadOnly
              variant="bordered"
              value={comment.comment}
              className="max-w"
            />
          )}

          <div style={{position: 'absolute', top: 25, right: 0, display: 'flex', fontSize:'small'}}>
          {comment.user === loginUser && (
            <>
              {editing[comment.comment_id] ? (
                <>
                  <span className="user" style={{color: '#6B7270'}} onClick={() => setEditing({...editing, [comment.comment_id]: false})}>취소</span>
                  <span className="user" style={{color: '#6B7270', paddingRight:'10px', paddingLeft:'10px'}} onClick={() => onUpdateCommentHandler(postId, comment.comment_id)}>수정</span>  
                </>
              ) : (
                <span className="user" style={{color: '#6B7270'}} onClick={() => setEditing({...editing, [comment.comment_id]: true})}>수정</span>
              )}
              <span onClick={() => openModal(comment.comment_id)} className="user" style={{color: '#6B7270', paddingRight:'10px', paddingLeft:'10px'}}>삭제</span>  
              <Modal isOpen={isModalOpen(comment.comment_id)} onOpenChange={() => closeModal(comment.comment_id)} backdrop="Transparent">
                  <ModalContent>
                      {(onClose) => (
                      <>
                          <ModalHeader className="flex flex-col gap-1">댓글 삭제</ModalHeader>
                          <ModalBody>
                          <p> 
                              댓글을 삭제하시겠습니까?
                          </p>
                          </ModalBody>
                          <ModalFooter>
                              <Button className='rounded-md' color="danger" variant="light" onPress={onClose}>
                                  닫기
                              </Button>
                              <Button 
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => onDeleteCommentHandler(postId, comment.comment_id)} 
                              type='submit' 
                              onPress={onClose}>
                                  삭제
                              </Button>
                          </ModalFooter>
                      </>
                  )}
                  </ModalContent>
              </Modal>
            </>  
          )}
          </div>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Article