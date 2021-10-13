from inspect import getouterframes
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse
from django.db.models import F
from django.utils import timezone

from .models import Question, Choice

from django.views import generic
# Create your views here.


def index(request):
    # Question.objects.order_by('-pub_date')[:5]
    latest_question_list = Question.objects.filter(
        pub_date__lte=timezone.now()
    ).order_by('-pub_date')[:5]
    context = {
        'latest_question_list' : latest_question_list
    }
    return render(request, 'poll/index.html', context)
    # template = loader.get_template('poll/index.html')
    # return HttpResponse(template.render(context, request))

def detail(request, qid):
    # try:
    #     question = Question.objects.get(pk=qid)
    # except Question.DoesNotExist:
    #     raise Http404("Question does not exist")
    question = get_object_or_404(Question, pk=qid)
    context = {
        'question': question
    }
    return render(request, 'poll/detail.html', context)

def results(request, qid):
    question = get_object_or_404(Question, pk=qid)
    return render(request, 'poll/results.html', {'question': question})


def vote(request, qid):
    question = get_object_or_404(Question, pk=qid)
    try:
        choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'poll/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        choice.votes = F('votes') + 1
        choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('poll:results', args=(question.id,)))



# class IndexView(generic.ListView):
#     template_name = 'poll/index.html'
#     context_object_name = 'latest_question_list'

#     def get_queryset(self):
#         """Return the last five published questions."""
#         return Question.objects.order_by('-pub_date')[:5]


# class DetailView(generic.DetailView):
#     model = Question
#     template_name = 'poll/detail.html'


# class ResultsView(generic.DetailView):
#     model = Question
#     template_name = 'poll/results.html'