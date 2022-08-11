from flask import Flask, request , jsonify
from flask_pymongo import PyMongo ,ObjectId
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import language_tool_python  
import re

app=Flask(__name__)

# app.config['MONGO_URI']='atlas-url'

mongo=PyMongo(app)
CORS(app)
print()
def check_plagiarism(s_vectors):
    similarity = lambda doc1, doc2: cosine_similarity([doc1, doc2])
    # plagiarism_results=[]
    plagiarism_results=set()
    for student_a, text_vector_a in s_vectors:
        new_vectors =s_vectors.copy()
        current_index = new_vectors.index((student_a, text_vector_a))
        del new_vectors[current_index]
        for student_b , text_vector_b in new_vectors:
            sim_score = similarity(text_vector_a, text_vector_b)[0][1]
            student_pair = sorted((student_a, student_b))
            score=(student_pair[0], student_pair[1],round(sim_score*100,2))
            # plagiarism_results.append(score)
            plagiarism_results.add(score)
    def by_sim(ele):
        return ele[2]
    return list(sorted(plagiarism_results, key=by_sim, reverse=True))

def check_gram(txt):
    tool = language_tool_python.LanguageTool('en-US')
    i = -1
    myText = open(r'temp.txt','w')
    myText.write(txt)
    mis=[]
    myText.close
    myText= open(r'temp.txt', 'r')
    for line in myText:
        matches = tool.check(line)
        i = i + len(matches)	
        pass
    myText.close
    mis.append("No. of mistakes found in document is : ")
    mis.append(str(i))
    for mistake in matches:
        mis.append(str(mistake))
    return mis  

db=mongo.db.guest
@app.route("/guestgram",methods=["GET"])
def guestGramReport():
    student_files=[]
    for x in db.find({},{"fname":1, "_id":0}):
        for key in x:
           student_files.append(x[key])
    student_mis=[]
    for x in db.find({},{"ginput":1, "_id":0}):
        for key in x:
           student_mis.append(check_gram(x[key]))
    s_vectors = list(zip(student_files, student_mis))       
    return jsonify(s_vectors)       

@app.route("/guestreport",methods=["GET"])
def guestreport():
    student_files=[]
    for x in db.find({},{"fname":1, "_id":0}):
        for key in x:
           student_files.append(x[key])
    student_notes=[]
    for x in db.find({},{"ginput":1, "_id":0}):
        for key in x:
           student_notes.append(x[key])
    vectorize = lambda Text: TfidfVectorizer().fit_transform(Text).toarray()
    vectors = vectorize(student_notes)
    s_vectors = list(zip(student_files, vectors))
    return jsonify(check_plagiarism(s_vectors))

@app.route("/guest",methods=["POST"])
def createGuest():
    id=db.insert_one({
        'fname': request.json['fname'],
        'ginput': request.json['ginput'],
    })
    return jsonify({'id':str(id.inserted_id),'msg': "guest added success"})

@app.route("/guest",methods=["GET"])
def getGuest():
    guest=[]
    for doc in db.find():
        guest.append({
            '_id': str(ObjectId(doc['_id'])),
            'fname': doc['fname'],
            'ginput': doc['ginput'],
        })
    return jsonify(guest)
@app.route("/guest", methods=["DELETE"])
def deleteGuest():
    db.delete_many({})
    print('\n # Deletion successful # \n')
    return jsonify("All guest files deleted!")

dbc=mongo.db.classes
@app.route("/studentgram",methods=["POST"])
def studentGramReport():
    student_files=[]
    student_mis=[]
    classCode = dbc.find({"code" :request.json['code'] });
    # for doc in classCode:
    #     print(doc);
    for assign in classCode[0]['assignments']:
        if(assign['questionNumber']==request.json['questionNumber']):
            for sol in assign['solutions']:
                if(sol['roll_no']==int(request.json['roll_no'])):
                    student_files.append(sol['fname']);
                    student_mis.append(check_gram(sol['solution']));

    s_vectors = list(zip(student_files, student_mis)) 
    print(student_files) 
    print(student_mis)     
    return jsonify(s_vectors)   
    # return jsonify(student_files)   

@app.route("/studentsub",methods=["POST"])
def studentsub():
    sub=""
    classCode = dbc.find({"code" :request.json['code'] });
    for assign in classCode[0]['assignments']:
        if(assign['questionNumber']==request.json['questionNumber']):
            for sol in assign['solutions']:
                if(sol['roll_no']==int(request.json['roll_no'])):
                    sub=sol['solution'];
    print(sub)
    return jsonify(sub)  
      
@app.route("/teacherplagreport",methods=["POST"])
def teacherplagreport():
    student_roll=[]
    student_soln=[]
    classCode = dbc.find({"code" :request.json['code'] });
    for assign in classCode[0]['assignments']:
        if(assign['questionNumber']==request.json['questionNumber']):
            for sol in assign['solutions']:
                    student_soln.append(sol['solution']);
                    student_roll.append(sol['roll_no']);
    vectorize = lambda Text: TfidfVectorizer().fit_transform(Text).toarray()
    vectors = vectorize(student_soln)
    s_vectors = list(zip(student_roll, vectors))
    return jsonify(check_plagiarism(s_vectors))

# @app.route("/getsoln",methods=["POST"])
# def getsoln():
#     classCode = dbc.find({"code" :request.json['code'] });
#     for assign in classCode[0]['assignments']:
#         if(assign['questionNumber']==request.json['questionNumber']):
#             my_dict = dict() 
#             for index,value in enumerate(assign['solutions']):
#                 my_dict[index] = value
#             # return assign['solutions']
#             return my_dict


if __name__=='__main__':
    app.run(debug=True)