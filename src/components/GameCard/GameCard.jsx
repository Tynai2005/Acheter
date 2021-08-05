import React from 'react';
import { useGames } from '../../contexts/GameContext';

const GameCard = ({game}) => {

    const {deleteGame,setEditGameInfo} = useGames()
    
    return (
        <div className='game-card'>
            <div className="game-img-div"><img className="game-card-img" src={game.image} alt={`${game.name} img`}/></div>
            <div className="game-card-info">
                <div style={{fontFamily:'Roboto',color:'gainsboro'}} >{game.name}</div>
                <div style={{color:'silver',fontSize:'12px'}}>{game.creator}</div>
                {game.isDiscount ? <div style={{fontSize:'14px',display:'flex',width:'80%',justifyContent:'space-around'}}>
                    <div style={{textAlign: 'center',width:'40px',height:'20px',backgroundColor:'royalblue',borderRadius:'5px',color:'gainsboro',fontSize: '11px'}} >-{game.discount}%</div>
                    <div style={{textDecoration:'line-through',color:'silver',fontSize:'12px'}}>{game.price}$</div>
                    <div style={{color:'gainsboro',fontSize:'15px'}}>{Math.ceil(Number(game.price)-(Number(game.price)/100*Number(game.discount)))}$</div>
                </div> : <div style={{color:'gainsboro',fontSize:'15px'}}>{game.price}$</div>}
                <button onClick={() => deleteGame(game.id)}>DELETE</button>
                <button onClick={()=> setEditGameInfo(game.id)}>EDIT</button>
            </div>
        </div>
    );
};

export default GameCard;