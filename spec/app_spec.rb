require 'spec_helper'
require 'open-uri'

describe App do
  def app
    @app ||= App
  end

  it "returns index page" do
    get '/'
    expect(last_response).to be_ok
  end

  it "process an image" do
    path = "./spec/files/test_photo_1.png"  
    tmp = 'tmp/test_photo_1.png'  
    file = Rack::Test::UploadedFile.new(path, "image/png")

    post '/process', :imagen => [file]

    expect(last_response.body).to eq(tmp)
    expect(last_response).to be_ok
  end

  it "process a file" do
    path = "./spec/files/test_file_1.txt"
    file = Rack::Test::UploadedFile.new(path, "mime/type")

    post '/process', :imagen => [file]

    expect(last_response).to_not be_ok
  end

  it "downloads the converted image" do
    path = 'tmp/test_photo_1.png'

    post '/download', :imagen => path

    response_image = Digest::MD5.hexdigest(last_response.body)
    temp_image = Digest::MD5.hexdigest(File.read(path))
    
    expect(response_image).to eq(temp_image)
    expect(last_response).to be_ok
  end
end
