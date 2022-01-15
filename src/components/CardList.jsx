import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {deleteCard, fetchCards, likedCard} from "../store/cards-reducer";

const CardList = () => {
    const [onlyLiked, setOnlyLiked] = useState(false)
    const [cardList, setCardList] = useState([])
    const {cards, isFetching, errorMsg} = useSelector(state => state.card)
    const dispatch = useDispatch()


    useEffect(() => {
        if (onlyLiked) {
            setCardList(cards.filter((card) => card.liked === true))
        } else {
            setCardList(cards)
        }

    }, [onlyLiked, cards])

    useEffect(() => {
        dispatch(fetchCards())
    }, [])

    return (
        <div className='container'>
            <div className={onlyLiked ? 'onLiked title' : 'title'}>
                <h3 onClick={() => setOnlyLiked(prevState => !prevState)}>Only  &#10084;</h3>
            </div>
            <div className='card'>

                {errorMsg}
                {isFetching ? '...Loading' :
                    cardList.map((card) => {
                        return (
                            <div key={card.id} className='card__item'>
                                <div className={card.liked ? 'card__liked card__content' : 'card__content'}>
                                    <div className='card__img'><img src={card.url} alt=""/></div>
                                    <div className='card__title'>{card.title}</div>
                                    <div className='card__delete'>
                                        <p onClick={()=>dispatch(deleteCard(card.id))}>x</p>
                                    </div>
                                    <div className='card__like'>
                                        <p
                                            onClick={() => dispatch(likedCard(card.id))}
                                        >
                                            &#10084;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CardList;