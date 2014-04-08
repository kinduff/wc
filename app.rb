#!/usr/bin/env ruby
require 'rubygems'
require 'sinatra'
require 'haml'
 
get '/' do
  haml :index
end

post '/process' do
  imagen = params[:imagen][0]
  formats = ['.png', '.jpg', '.jpeg']
  puts File.extname(imagen[:filename]).downcase
  if formats.include? File.extname(imagen[:filename]).downcase
    original = 'tmp/'+imagen[:filename]
    converted = 'tmp/'+imagen[:filename].split('.').first+'.png'
    FileUtils.cp(imagen[:tempfile].path, original)
    `convert '#{original}'\
      -morphology Convolve DoG:15,100,0\
      -negate -normalize -blur 0x1 -channel RBG -level 60%,91%,0.1\
      '#{converted}'`
    "#{converted}"
  else
    status 400
  end
end

post '/download' do
  file = params[:imagen]
  send_file file,
    :filename => 'descarga.png',
    :disposition => 'attachment',
    :stream => false,
    :type => 'image/png',
    :status => 200
end