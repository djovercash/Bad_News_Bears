class Api::V1::IdeasController < ApplicationController

  def index
    @ideas = Idea.all
    render json: @ideas
  end

  def show
    @idea = Idea.find(params[:id])
    render json: @idea
  end

  def create
    @idea = Idea.create(idea_params)
    render json: @idea
  end

  def update
    @idea = Idea.find(params[:id])
    @idea.update(idea_params)
    if @idea.save
      render json: @idea
    else
      render json: {errors: @idea.errors.full_messages}, status: 422
    end
  end

  def destroy
    @idea = Idea.find(params[:id])
    @idea.destroy
    render json: {message: "All Gone"}
  end

  private

  def idea_params
    params.require(:idea).permit(:description, :user_id, :do_it, :dont_do_it, :outcome, :good, :url)
  end
end
